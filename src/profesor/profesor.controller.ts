import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  async create(@Body() createProfesorDto: CreateProfesorDto) {
    return await this.profesorService.create(createProfesorDto);
  }

  @Get()
  async findAll() {
    return await this.profesorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.profesorService.findOne(+id);
  }

  
  @Get('/find_by_name/:name')
  async findOneByName(@Param('name') name: string) {
    return await this.profesorService.findOneByName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfesorDto: UpdateProfesorDto) {
    return this.profesorService.update(+id, updateProfesorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.profesorService.remove(+id);
  }
}
