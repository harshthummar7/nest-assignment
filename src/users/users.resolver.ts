import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Response } from './response';
import { SignupUserInput } from './dto/signup-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateTaskInput } from 'src/tasks/dto/create-task.input';
import { ResponseTask } from 'src/tasks/response-task';
import { UpdateTaskInput } from 'src/tasks/dto/update-task.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService,private taskService:TasksService) {}

  @Mutation(()=>Response)
  signup(@Args('signupUserInput')signupUserInput:SignupUserInput){
      return this.usersService.signup(signupUserInput)
  }

  @Mutation(()=>Response)
  login(@Args('loginUserInput')loginUserInput:LoginUserInput){
    return this.usersService.login(loginUserInput)
  }
  
  @UseGuards(JwtAuthGuard)
  @Mutation(() => ResponseTask)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput,@Context() context) {
    
    return this.taskService.create(createTaskInput,context?.req?.user?.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ResponseTask)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.taskService.update(updateTaskInput.id, updateTaskInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ResponseTask)
  removeTask(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Response)
  removeUser(@Context() context) {
    
    return this.usersService.remove(context?.req?.user?.id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(()=>[ResponseTask])
  findAllTask(@Context() context) {
    return this.taskService.findAll(context?.req?.user?.id);
  }


  @UseGuards(JwtAuthGuard)
  @Query(() => ResponseTask)
  findOneTask(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.findOne(id);
  }



  

  
}
