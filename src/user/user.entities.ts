import { StringifyOptions } from "querystring";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User 
{
    @Column()
    @PrimaryGeneratedColumn()
    id:Number;
    @Column()
    email:String;
    @Column()
    username:String;
    @Column()
    password:String
}