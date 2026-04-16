import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { CreateHabitDto, UpdateHabitDto } from './dto/create-habit.dto';
import { CreateWeekDto } from './dto/create-week.dto';
import { ToggleTrackDto } from './dto/toggle-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HabitsService {
  constructor(private prisma: PrismaService) {}

  // ==================== HABITS ====================

  async createHabit(dto: CreateHabitDto) {
  if (!dto.name || !dto.userId) {
    throw new BadRequestException('name va userId required');
  }

  return this.prisma.habit.create({
    data: {
      name: dto.name,
      userId: dto.userId, // 🔥 null olib tashlandi
      color: dto.color ?? '#10B981',
      icon: dto.icon ?? null,
    },
  });
}

  async getAllHabits(userId: string) {
  return this.prisma.habit.findMany({
    where: { isActive: true, userId },
    orderBy: { createdAt: 'desc' },
    include: {
      tracks: {
        orderBy: { trackDate: 'asc' },
      },
    },
  });
}

  async getHabitById(id: string, userId: string) {
  const habit = await this.prisma.habit.findFirst({
    where: { id, userId },
    include: {
      tracks: {
        orderBy: { trackDate: 'asc' },
      },
    },
  });

  if (!habit) {
    throw new NotFoundException('Odat topilmadi');
  }

  return habit;
}
  async getUserHabits(userId: string) {
  return this.prisma.habit.findMany({
    where: { userId, isActive: true },
    include: {
      tracks: true,
    },
  });
}

  async updateHabit(id: string, userId: string, dto: UpdateHabitDto) {
    await this.getHabitById(id, userId);

    return this.prisma.habit.update({
      where: { id },
      data: {
        name: dto.name ?? undefined,
        color: dto.color ?? undefined,
        icon: dto.icon ?? undefined,
      },
    });
  }

  async deleteHabit(id: string, userId: string,) {
    await this.getHabitById(id,userId);

    return this.prisma.habit.update({
      where: { id },
      data: { isActive: false },
    });
  }

  // ==================== WEEKS ====================

  async createWeek(dto: CreateWeekDto) {
    if (!dto.startDate || !dto.endDate || !dto.weekNumber) {
      throw new BadRequestException('Week data required');
    }

    const startDate = new Date(dto.startDate);
    const endDate = new Date(dto.endDate);

    const existing = await this.prisma.habitWeek.findFirst({
      where: {
        weekNumber: dto.weekNumber,
        startDate,
      },
    });

    if (existing) {
      return this.prisma.habitWeek.update({
        where: { id: existing.id },
        data: { endDate },
      });
    }

    return this.prisma.habitWeek.create({
      data: {
        weekNumber: dto.weekNumber,
        startDate,
        endDate,
      },
    });
  }

  async getAllWeeks() {
    return this.prisma.habitWeek.findMany({
      orderBy: { weekNumber: 'asc' },
      include: {
        tracks: {
          include: {
            habit: true,
          },
        },
      },
    });
  }

  async getWeekById(id: string) {
    const week = await this.prisma.habitWeek.findUnique({
      where: { id },
      include: {
        tracks: {
          include: {
            habit: true,
          },
        },
      },
    });

    if (!week) {
      throw new NotFoundException('Hafta topilmadi');
    }

    return week;
  }

 async deleteWeek(id: string) {
  const week = await this.prisma.habitWeek.findUnique({
    where: { id },
  });

  if (!week) {
    throw new NotFoundException('Hafta topilmadi');
  }

  return this.prisma.habitWeek.delete({
    where: { id },
  });
}

  // ==================== TRACKING ====================

  async toggleTrack(dto: ToggleTrackDto) {
    if (!dto.habitId || !dto.weekId || !dto.trackDate) {
      throw new BadRequestException('Required fields missing');
    }

    const trackDate = new Date(dto.trackDate);

    const existing = await this.prisma.habitTrack.findUnique({
      where: {
        habitId_trackDate: {
          habitId: dto.habitId,
          trackDate,
        },
      },
    });

    if (existing) {
      return this.prisma.habitTrack.update({
        where: { id: existing.id },
        data: {
          isCompleted: dto.isCompleted ?? false,
          notes: dto.notes ?? null,
        },
      });
    }

    return this.prisma.habitTrack.create({
      data: {
        habitId: dto.habitId,
        weekId: dto.weekId,
        trackDate,
        isCompleted: dto.isCompleted ?? false,
        notes: dto.notes ?? null,
      },
    });
  }

  async getTracksByHabit(habitId: string) {
    return this.prisma.habitTrack.findMany({
      where: { habitId },
      orderBy: { trackDate: 'asc' },
      include: {
        week: true,
      },
    });
  }

  async getTracksByWeek(weekId: string) {
    return this.prisma.habitTrack.findMany({
      where: { weekId },
      orderBy: { trackDate: 'asc' },
      include: {
        habit: true,
      },
    });
  }

  // ==================== DASHBOARD ====================

  async getDashboard(userId: string) {
  const weeks = await this.prisma.habitWeek.findMany({
    orderBy: { weekNumber: 'asc' },
  });

  const habits = await this.prisma.habit.findMany({
    where: { userId, isActive: true },
    include: { tracks: true },
  });

  return weeks.map((week) => ({
    week,
    habits: habits.map((habit) => ({
      ...habit,
      tracks: habit.tracks.filter((t) => t.weekId === week.id),
    })),
  }));
}
  // ==================== STATISTICS ====================

  async getHabitStats(habitId: string, userId: string,) {
    const habit = await this.getHabitById(habitId, userId);

    const totalTracks = await this.prisma.habitTrack.count({
      where: { habitId },
    });

    const completedTracks = await this.prisma.habitTrack.count({
      where: {
        habitId,
        isCompleted: true,
      },
    });

    const completionRate =
      totalTracks > 0
        ? ((completedTracks / totalTracks) * 100).toFixed(1)
        : '0';

    return {
      habit,
      totalDays: totalTracks,
      completedDays: completedTracks,
      missedDays: totalTracks - completedTracks,
      completionRate: `${completionRate}%`,
    };
  }

  async getWeekStats(weekId: string) {
    const week = await this.getWeekById(weekId);

    const totalTracks = await this.prisma.habitTrack.count({
      where: { weekId },
    });

    const completedTracks = await this.prisma.habitTrack.count({
      where: {
        weekId,
        isCompleted: true,
      },
    });

    const completionRate =
      totalTracks > 0
        ? ((completedTracks / totalTracks) * 100).toFixed(1)
        : '0';

    return {
      week,
      totalTracks,
      completedTracks,
      missedTracks: totalTracks - completedTracks,
      completionRate: `${completionRate}%`,
    };
  }
}