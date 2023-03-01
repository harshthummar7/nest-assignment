import { Field, InputType, Int } from "@nestjs/graphql"
import { IsEmail, isEmail } from "class-validator"

@InputType()
export class LoginUserInput{
    
    @Field()
    @IsEmail({},{message:"email is not valid"})
    email:string

    @Field()
    password:string
}