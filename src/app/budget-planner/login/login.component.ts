import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  loginForm: any;
  registerForm: any;
  activeForm: "login" | "register" = "login";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });

    this.registerForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  toggleForm(form: "login" | "register") {
    this.activeForm = form;
  }

  login() {
    if (this.loginForm.valid) {
      this.http
        .post("http://localhost:3000/api/auth/login", this.loginForm.value)
        .subscribe({
          next: (res: any) => {
            this.snackBar.open(res.message, "Close", { duration: 3000 });
            this.router.navigate(["/budget-planner/dashboard"]);
          },
          error: (err) => {
            this.snackBar.open(err.error.message || "Login failed", "Close", {
              duration: 3000,
            });
          },
        });
    } else {
      this.snackBar.open("Invalid email or password!", "Close", {
        duration: 3000,
      });
    }
  }

  register() {
    if (this.registerForm.valid) {
      this.http
        .post(
          "http://localhost:3000/api/auth/register",
          this.registerForm.value
        )
        .subscribe({
          next: (res: any) => {
            this.snackBar.open(res.message, "Close", { duration: 3000 });
            this.toggleForm("login");
          },
          error: (err) => {
            this.snackBar.open(
              err.error.message || "Registration failed",
              "Close",
              { duration: 3000 }
            );
          },
        });
    } else {
      this.snackBar.open("Please fill in all fields correctly!", "Close", {
        duration: 3000,
      });
    }
  }
}
