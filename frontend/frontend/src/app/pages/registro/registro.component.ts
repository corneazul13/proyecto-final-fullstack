import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const formValues = this.registroForm.value;

      const data = {
        name: formValues.nombre,
        email: formValues.correo,
        password: formValues.password
      };

      console.log('Datos enviados:', data);

      this.auth.register(data).subscribe({
        next: (res: any) => {
          alert(res.message || 'Usuario registrado correctamente');

          // Guarda usuario localmente
          this.auth.saveUserLocal({
            name: data.name,
            email: data.email
          });

          // 👇 Redirigir al dashboard después del registro
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {
          console.error('Error al registrar:', err);
          alert(err.error?.message || 'Error al registrar usuario');
        }
      });
    } else {
      alert('Por favor completa todos los campos');
    }
  }
}
