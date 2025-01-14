import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  async create(@Body() createMaterialDto: CreateMaterialDto) {
    return await this.materialService.create(createMaterialDto);
  }

  @Get()
  async findAll() {
    return await this.materialService.findAll();
  }

  @Get('/unidad/:id')
  async findAllMaterialesDeUnidad(@Param('id') id: string) {
    return await this.materialService.findAllMaterialesDeunidad(+id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.materialService.findOne(+id);
  }

  @Get('/find_by_name/:name')
  async findOneByName(@Param('name') name: string) {
    return await this.materialService.findOneByName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaterialDto: UpdateMaterialDto) {
    return this.materialService.update(+id, updateMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialService.remove(+id);
  }
}
