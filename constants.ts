import { ServicePlan } from './types';

export const SERVICE_PLANS: ServicePlan[] = [
  {
    id: 'basico',
    name: 'Servicio Básico',
    price: 'S/ 0',
    description: 'Solo DJ',
    details: [
      '1 Cabina con stand para Dj en estructura modelo Global Truss',
      '2 luces par led DMX de 36 x 3 w',
      '1 Pantalla led de 90 x 20 cm publicitaria',
      '2 barras led según el montaje',
      '1 Laptop Macbook pro',
      '1 Controlador marca Traktor',
      '1 Micrófono alámbrico Shure',
      '1 Audífonos Pioneer HDJ 2000',
      '1 Consola Behringer de 8 canales',
    ],
    rider: 'Requiere: 1 toma de corriente y 2 cables XLR para audio.'
  },
  {
    id: 'platiniun',
    name: 'Servicio Platinum',
    price: 'S/ 0',
    description: 'DJ + Sonido (6 horas)',
    details: [
      'Todo lo del Plan Básico',
      '1 Sistema amplificado de 15" Turbosound de 1000w RMS',
      '1 Subwoofer Bheringer de 18" de 3000w RMS',
      '1 Consola Behringer de 8 canales',
    ],
    rider: 'RIDER AUDIO.'
  },
  {
    id: 'diamante',
    name: 'Servicio Diamante',
    price: 'S/ 0',
    description: 'DJ + Sonido + Iluminación (6 horas)',
    details: [
      'Todo lo del Plan Platinum',
      'Set de estructura tipo Global Truss para iluminación',
      '4 luces par led DMX de 36 x 3 w',
      '1 Máquina de humo',
      '2 barras móviles beam robótica',
      '1 Consola Behringer de 8 canales',
    ],
    rider: 'RIDER AUDIO E ILUMINACIÓN.'
  },
  {
    id: 'diamante-premium',
    name: 'Servicio Diamante Premium',
    price: 'S/ 0',
    description: 'Todo incluido para una experiencia inolvidable',
    details: [
      'Todo lo del Plan Diamante',
      '2 Pantallas Led de 50 pulgadas en pedestales',
      '1 Filmaker para grabación de video profesional',
      '1 Fotógrafo profesional para cobertura del evento',
      '1 Hora loca temática con personajes y accesorios',
      '1 Consola Behringer de 8 canales',
    ],
    rider: 'COORDINACIÓN COMPLETA DE RIDER.'
  }
];

export const TERMS_AND_CONDITIONS: string[] = [
    "Garantía a tratar según las condiciones del lugar.",
    "Todos los presupuestos son para salón cerrado. Eventos al aire libre se deben evaluar y pueden aumentar costos de equipos.",
    "La instalación previa es hasta máximo un 1er piso. Cada piso superior sin ascensor tendrá un costo extra a coordinar.",
    "El paquete es por servicio continuo. Interrupciones como grupo musical, orquesta, etc., no detienen el conteo de horas.",
    "El precio de movilidad es aparte y se calcula según distrito.",
    "Se reserva la fecha con el 50% por adelantado. El 50% restante se cancela el día del evento al finalizar la instalación y prueba de sonido.",
    "En caso de cancelar el evento, el monto adelantado no es reembolsable.",
    "Precios no incluyen IGV. Si se desea factura, se aumentará el IGV sobre el monto acordado más comisión.",
    "Se acepta PLIN, transferencia (Scotiabank, BCP), o efectivo.",
    "Contrato base por 6 horas (ej. 9pm a 3am) para un aforo de 200 personas en espacio cerrado. Horas extras tienen un costo del 20% sobre el precio del servicio contratado y se cancelan al momento de su solicitud.",
    "El cliente es responsable de eventos fortuitos (peleas, líquidos arrojados a los equipos, etc.) y cualquier deterioro causado por los asistentes.",
    "Si el cliente desea duplicar el sonido, se agregará un valor de 600 soles."
];