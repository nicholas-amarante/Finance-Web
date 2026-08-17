export const formatCurrency = (value: string | number | null | undefined): string => {
  if (!value) return '';
  
  // Remove tudo que não for dígito
  const cleanValue = String(value).replace(/\D/g, '');
  if (!cleanValue) return '';

  // Converte para float considerando os 2 últimos dígitos como centavos
  const numberValue = Number(cleanValue) / 100;

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numberValue);
};

export const parseCurrencyToNumber = (formattedValue: string | null | undefined): number => {
  if (!formattedValue) return 0;
  const cleanValue = String(formattedValue).replace(/\D/g, '');
  return Number(cleanValue) / 100;
};