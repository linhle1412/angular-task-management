import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  onSubmit() {
    console.log(this.email, this.password);
    this.authService
      .login(this.email?.value!, this.password?.value!)
      .then(() => {
        this.toastr.success('Login successfully!');
      })
      .catch((error) => {
        this.toastr.error(error);
      });
  }
}
