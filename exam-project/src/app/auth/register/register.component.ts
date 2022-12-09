import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CreateUserDto, UserService } from 'src/app/core/user.service';
import { MessageBusService, MessageType } from 'src/app/core/message-bus.service';
import { emailValidator, nameValidator, passwordMatch, passwordMatch2 } from '../util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage: string = '';
  passwordControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);

  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  registerFormGroup: FormGroup = this.formBuilder.group({
    'username': new FormControl(null, [Validators.required, Validators.minLength(5), nameValidator]),
    'email': new FormControl(null, [Validators.required, emailValidator]),
    'passwords': new FormGroup({
      'password': this.passwordControl,
      'rePassword': new FormControl(null, [passwordMatch(this.passwordControl)]),
    })

  })

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,   private messageBus: MessageBusService) { }

  ngOnInit(): void {
  }

  shouldShowErrorForControl(controlName: string, sourceGroup: FormGroup = this.registerFormGroup) {
    return sourceGroup.controls[controlName].touched && sourceGroup.controls[controlName].invalid
  }

  handleRegister(): void {
    const { username, email, passwords } = this.registerFormGroup.value;

    const body: CreateUserDto = {
      username: username,
      email: email,
      password: passwords.password,
      // ...(tel && { tel: telRegion + tel})
    }

    this.authService.register$(body).subscribe({
      next: user => {
        this.router.navigate(['/home']);

        this.messageBus.notifyForMessage({
          text: 'User successfully register!',
          type: MessageType.Success
        })
      },
      complete: () => {
        // console.log('register stream completed');
      },
      error: (err) => {
        // console.log('Error is ', err.error.message)
        this.errorMessage = err.error.message;
      }
    })

  }
}
