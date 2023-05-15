// Recibe un string con la fecha y le quita los segundos
const estandarizarFecha = (fecha: string | undefined): string => {
  if (!fecha) return ''
  const dia = fecha.slice(0, 10);
  const hora = fecha.slice(11, 16);
  return `${dia} / ${hora}`
}

export default estandarizarFecha;