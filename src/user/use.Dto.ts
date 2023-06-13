// export class UserDtosingin {
//     email:String;
//     password:String;
//     image:String;
//     constructor(){
//         this.image='none';
//     }
// }
export class UserDto {
    username:String;
    email:String;
    password:String;
    confirmpassword:String;
    image:String;
    constructor(){
        this.image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZqtgZ2eW2F2HvvFOq9Rs0kVWiWJL7pQbA5g&usqp=CAU';
        this.confirmpassword = 'none';
        this.password = 'Oauth';
    }
}
export class jwtDTO{
    username:String;
    email:String;
}
// export class UserDtosave {
//     username:String;
//     email:String;
//     password:String;
//     image:String;
//     constructor(){
//         this.image='none';
//     }
// }
// export class UserOauth{
//     username:String;
//     password:String;
//     email:String;
//     image:String;
//     constructor(){
//         this.image='none';
//         this.password='Oauth';
//     }
// }