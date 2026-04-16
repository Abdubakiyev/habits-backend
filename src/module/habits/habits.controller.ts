import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto, UpdateHabitDto } from './dto/create-habit.dto';
import { CreateWeekDto } from './dto/create-week.dto';
import { ToggleTrackDto } from './dto/toggle-track.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Habits')
@Controller('habits')
export class HabitsController {
  constructor(private habitsService: HabitsService) {}

  // ==================== HABITS ====================

  @Post()
  @ApiOperation({ summary: 'Create a new habit' })
  @ApiBody({ type: CreateHabitDto })
  @ApiResponse({ status: 201, description: 'Habit created successfully' })
  createHabit(@Body() dto: CreateHabitDto) {
    return this.habitsService.createHabit(dto);
  }

  @Get('all/:userId')
  @ApiOperation({ summary: 'Get all habits of a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  getAllHabits(@Param('userId') userId: string) {
    return this.habitsService.getAllHabits(userId);
  }

  @Get('one/:userId/:id')
  @ApiOperation({ summary: 'Get habit by ID for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiParam({ name: 'id', description: 'Habit ID' })
  getHabitById(@Param('userId') userId: string, @Param('id') id: string) {
    return this.habitsService.getHabitById(id, userId);
  }

  @Put(':userId/:id')
  @ApiOperation({ summary: 'Update a habit for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiParam({ name: 'id', description: 'Habit ID' })
  @ApiBody({ type: UpdateHabitDto })
  updateHabit(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateHabitDto,
  ) {
    return this.habitsService.updateHabit(id, userId, dto);
  }

  @Delete(':userId/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete (soft) a habit for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiParam({ name: 'id', description: 'Habit ID' })
  deleteHabit(@Param('userId') userId: string, @Param('id') id: string) {
    return this.habitsService.deleteHabit(id, userId);
  }

  // ==================== WEEKS ====================

  @Post('weeks')
  @ApiOperation({ summary: 'Create a new week' })
  @ApiBody({ type: CreateWeekDto })
  createWeek(@Body() dto: CreateWeekDto) {
    return this.habitsService.createWeek(dto);
  }

  @Get('weeks')
  @ApiOperation({ summary: 'Get all weeks' })
  getAllWeeks() {
    return this.habitsService.getAllWeeks();
  }

  @Get('weeks/:id')
  @ApiOperation({ summary: 'Get a week by ID' })
  @ApiParam({ name: 'id', description: 'Week ID' })
  getWeekById(@Param('id') id: string) {
    return this.habitsService.getWeekById(id);
  }

  @Delete('weeks/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a week by ID' })
  @ApiParam({ name: 'id', description: 'Week ID' })
  deleteWeek(@Param('id') id: string) {
    return this.habitsService.deleteWeek(id);
  }

  // ==================== TRACKING ====================

  @Post('tracks/toggle')
  @ApiOperation({ summary: 'Toggle habit track (complete/incomplete)' })
  @ApiBody({ type: ToggleTrackDto })
  toggleTrack(@Body() dto: ToggleTrackDto) {
    return this.habitsService.toggleTrack(dto);
  }

  @Get('tracks/habit/:habitId')
  @ApiOperation({ summary: 'Get all tracks for a habit' })
  @ApiParam({ name: 'habitId', description: 'Habit ID' })
  getTracksByHabit(@Param('habitId') habitId: string) {
    return this.habitsService.getTracksByHabit(habitId);
  }

  @Get('tracks/week/:weekId')
  @ApiOperation({ summary: 'Get all tracks for a week' })
  @ApiParam({ name: 'weekId', description: 'Week ID' })
  getTracksByWeek(@Param('weekId') weekId: string) {
    return this.habitsService.getTracksByWeek(weekId);
  }

  // ==================== DASHBOARD ====================

  @Get('dashboard/:userId')
  @ApiOperation({ summary: 'Get dashboard for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  getDashboard(@Param('userId') userId: string) {
    return this.habitsService.getDashboard(userId);
  }

  // ==================== STATISTICS ====================

  @Get('stats/habit/:userId/:habitId')
  @ApiOperation({ summary: 'Get habit statistics for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiParam({ name: 'habitId', description: 'Habit ID' })
  getHabitStats(
    @Param('userId') userId: string,
    @Param('habitId') habitId: string,
  ) {
    return this.habitsService.getHabitStats(habitId, userId);
  }

  @Get('stats/week/:weekId')
  @ApiOperation({ summary: 'Get week statistics' })
  @ApiParam({ name: 'weekId', description: 'Week ID' })
  getWeekStats(@Param('weekId') weekId: string) {
    return this.habitsService.getWeekStats(weekId);
  }
}