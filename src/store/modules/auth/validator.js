import validator from 'email-validator';
import { toast } from 'react-toastify';

export default function ({ nome, email, password, id, password2 }) {
  let formErrors = false;

  if (!nome) {
    formErrors = true;
    toast.error('Nome Invalido!');
  }
  if (!validator.validate(email)) {
    formErrors = true;
    toast.error('Email Invalido!');
  }
  if (!id) {
    if (password.length < 6) {
      formErrors = true;
      toast.error('Senha deve conter mais de 6 digitos!');
    }
    if (password2 && password !== password2) {
      formErrors = true;
      toast.error('Senhas Precisam ser Iguais!');
    }
  }
  return formErrors;
}
