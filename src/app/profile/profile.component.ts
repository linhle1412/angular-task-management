import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  form = new FormGroup({
    displayName: new FormControl(''),
    email: new FormControl('', [Validators.email, Validators.required]),
  });
  constructor(private authService: AuthService, private toastr: ToastrService) {
    this.authService.onGetProfile.subscribe((user) => {
      this.form.setValue({
        displayName: user.displayName,
        email: user.email,
      });
    });
  }
  get displayName() {
    return this.form.get('displayName');
  }

  onSubmit() {
    this.authService
      .updateProfile(this.displayName?.value!)
      .then(() => {
        this.toastr.success('Update profile successfully!');
      })
      .catch((error) => {
        this.toastr.error(error.message);
      });
  }
}
