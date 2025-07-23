import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../shared/input/input.component';
import { AlertComponent } from '../../shared/alert/alert.component';
import { AuthService } from '../../services/auth.service';
import { Match, EmailTaken } from './validators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputComponent, AlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  emailTaken = inject(EmailTaken);

  form = this.fb.nonNullable.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [Validators.required, Validators.email],
        [this.emailTaken.validate],
      ],
      age: [18, [Validators.required, Validators.min(18), Validators.max(120)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
          ),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13),
        ],
      ],
    },
    {
      validators: [Match('password', 'confirmPassword')],
    }
  );

  showAlert = signal(false);
  alertMsg = signal('Please wait! Your account is being created.');
  alertColor = signal('blue');
  inSubmission = signal(false);

  async register() {
    this.showAlert.set(true);
    this.alertMsg.set('Please wait! Your account is being created.');
    this.alertColor.set('blue');
    this.inSubmission.set(true);

    try {
      await this.auth.createUser(this.form.getRawValue());
    } catch (e: any) {
      console.error('Registration error:', e);

      let errorMessage = 'An unexpected error occurred! Please try again later.';
      
      if (e?.code) {
        switch (e.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'This email is already registered. Please use a different email or try signing in.';
            break;
          case 'auth/weak-password':
            errorMessage = 'Password is too weak. Please use a stronger password.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Please enter a valid email address.';
            break;
          case 'auth/operation-not-allowed':
            errorMessage = 'Email/password authentication is not enabled. Please contact support.';
            break;
          default:
            errorMessage = `Registration failed: ${e.message}`;
        }
      }

      this.alertMsg.set(errorMessage);
      this.alertColor.set('red');
      this.inSubmission.set(false);
      return;
    }

    this.alertMsg.set('Success! Your account has been created.');
    this.alertColor.set('green');
  }
}
