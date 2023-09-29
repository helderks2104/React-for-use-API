import { toast } from 'react-toastify';
import { isInt, isFloat, isEmail } from 'validator';
import PropTypes from 'prop-types';

export default function ({ nome, sobrenome, email, idade, peso, altura }) {
  let formErrors = false;

  if (!nome || nome.length < 3) {
    formErrors = true;
    toast.error('Nome Invalido!');
  }
  if (!sobrenome || sobrenome.length < 3) {
    formErrors = true;
    toast.error('Sobrenome Invalido!');
  }
  if (!isEmail(email)) {
    formErrors = true;
    toast.error('Email Invalido!');
  }
  if (!isInt(String(idade))) {
    formErrors = true;
    toast.error('Idade Invalida!');
  }
  if (!isFloat(String(peso))) {
    formErrors = true;
    toast.error('Peso Invalido!');
  }
  if (!isFloat(String(altura))) {
    formErrors = true;
    toast.error('Altura Invalido!');
  }

  return formErrors;
}
