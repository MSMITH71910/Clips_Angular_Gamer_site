import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../shared/alert/alert.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);

  credentials = {
    email: '',
    password: '',
  };

  showAlert = signal(false);
  alertMsg = signal('Please wait! We are logging you in.');
  alertColor = signal('blue');
  inSubmission = signal(false);

  async login() {
    this.showAlert.set(true);
    this.alertMsg.set('Please wait! We are logging you in.');
    this.alertColor.set('blue');
    this.inSubmission.set(true);

    try {
      await this.authService.signIn(
        this.credentials.email,
        this.credentials.password
      );
    } catch (e: any) {
      this.inSubmission.set(false);
      console.error('Login error:', e);

      let errorMessage = 'An unexpected error occurred! Please try again later.';
      
      if (e?.code) {
        switch (e.code) {
          case 'auth/user-not-found':
            errorMessage = 'No account found with this email. Please check your email or register first.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password. Please try again.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Please enter a valid email address.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'This account has been disabled. Please contact support.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many failed attempts. Please try again later.';
            break;
          default:
            errorMessage = `Login failed: ${e.message}`;
        }
      }

      this.alertMsg.set(errorMessage);
      this.alertColor.set('red');
      return;
    }

    this.alertMsg.set('Success! You are now logged in.');
    this.alertColor.set('green');
  }
}
