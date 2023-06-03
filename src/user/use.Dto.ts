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
        this.image='none';
        this.confirmpassword = 'none';
        this.password = 'Oauth';
    }
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