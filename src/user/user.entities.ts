import { StringifyOptions } from "querystring";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
class Username{
    givenName:String;
    familyName:String;
}
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
    @Column({default:'Oauth'})
    password:String
    @Column({default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZqtgZ2eW2F2HvvFOq9Rs0kVWiWJL7pQbA5g&usqp=CAU'})
    image:String;
}