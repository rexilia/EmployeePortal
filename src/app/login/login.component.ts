import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    errorMessage: string;
    loading: boolean = true;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private as: AuthService
    ) {}
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    onSwitchMode(){
      this.isLoginMode = !this.isLoginMode;
    }
    onSubmit(form: NgForm) {
      if(!form.valid){
        return
      }
      const email = form.value.email;
      const password = form.value.password;
      //let authObs: Observable<AuthResponseData>;
      this.isLoading = true;
      if(this.isLoginMode){
        this.login(email,password);
        //...
      }else{
        //this.signUp(email, password)
        console.log(form.value);
      }
      /*authObs.subscribe(
        resData => {
          console.log(resData);
          this.router.navigate(['/main'])
        },errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
        }
      )*/
      form.reset();
    }

    ngOnInit(): void {
        /*this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(5)]],
        });
        this.as.loginState.subscribe((val) => {
            console.log(val);
            if (val === 'AUTH_INITIATED') {
                this.loading = true;
            }
            if (val === 'AUTH_SIGNED_IN') {
                this.navigateToHome();
            }
            if (val === 'AUTH_SIGNED_OUT') {
                this.loading = false;
            }
        });*/
    }

    login(email,password) {
        //const lfv = this.loginForm.value;
        this.as
            .login(email, password)
            .then(() => this.navigateToHome())
            .catch((err) => {
                this.errorMessage = err.message;
                this.loginForm.reset();
            });
    }
    loginManager() {
        const lfv = this.loginForm.value;
        this.as
            .login(lfv.email, lfv.password)
            .then(() => this.navigateToManager())
            .catch((err) => {
                this.errorMessage = err.message;
                this.loginForm.reset();
            });
    }
    navigateToManager() {
        this.router.navigate(['src\app\home\manager\manager.component.html']);
    }
    navigateToHome() {
        this.router.navigate(['/home']);
    }
}
