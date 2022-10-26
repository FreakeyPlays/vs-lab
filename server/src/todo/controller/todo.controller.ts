import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put
} from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { DeleteResult, UpdateResult } from 'typeorm'
import { T_Todo } from '../models/todo.interface'
import { TodoService } from '../service/todo.service'

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  @Inject(TodoService)
  private readonly service: TodoService

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        label: { description: 'The Label of the Todo', type: 'string' },
        priority: {
          description: 'The Priority 0 - 10 of the Todo',
          type: 'number',
          required: ['false'],
          default: 5
        },
        done: {
          description: 'The Status of the Todo',
          type: 'boolean',
          default: false
        },
        position: {
          description: 'The Position of the Todo',
          type: 'number'
        }
      }
    }
  })
  @Post()
  public createTodo(@Body() todo: T_Todo): Promise<T_Todo> {
    return this.service.addOne(todo)
  }

  @Get()
  public findAllTodos(): Promise<T_Todo[]> {
    return this.service.findAll()
  }

  @Get('/:id')
  public findTodoByName(@Param('id') id: number): Promise<T_Todo> {
    return this.service.findOne(id)
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        label: { description: 'The Label of the Todo', type: 'string' },
        priority: {
          description: 'The Priority 0 - 10 of the Todo',
          type: 'number'
        },
        done: {
          description: 'The Status of the Todo',
          type: 'boolean'
        },
        position: {
          description: 'The Position of the Todo',
          type: 'number'
        }
      }
    }
  })
  @Put('/:id')
  public updateTodo(
    @Param('id') id: number,
    @Body() todo: T_Todo
  ): Promise<UpdateResult> {
    return this.service.updateOne(id, todo)
  }

  @Delete('/:id')
  public deleteTodo(@Param('id') id: number): Promise<DeleteResult> {
    return this.service.removeOne(id)
  }
}
