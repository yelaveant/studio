'use server';

import { z } from 'zod';
import type { SearchState } from '@/lib/types';

const SearchSchema = z.object({
  ruc: z.string().min(11, { message: "El RUC debe tener 11 dígitos." }).max(11, { message: "El RUC debe tener 11 dígitos." }),
  documentType: z.string().min(1, { message: "Por favor seleccione un tipo de documento." }),
  voucherNumber: z.string().min(1, { message: "Por favor ingrese el número de comprobante." }),
});

export async function searchDocuments(prevState: SearchState, formData: FormData): Promise<SearchState> {
  const validatedFields = SearchSchema.safeParse({
    ruc: formData.get('ruc'),
    documentType: formData.get('documentType'),
    voucherNumber: formData.get('voucherNumber'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error de validación. Por favor revise los campos.',
    };
  }
  
  const { ruc, documentType, voucherNumber } = validatedFields.data;

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock file search logic
  if (ruc === '20546008879' && voucherNumber.toUpperCase() === 'FM01-0001570') {
    const xmlFileName = `${ruc}-${documentType}-${voucherNumber.toUpperCase()}.xml`;
    const cdrFileName = `R-${ruc}-${documentType}-${voucherNumber.toUpperCase()}.zip`;
    
    return {
      message: 'Documentos encontrados exitosamente.',
      files: {
        xml: {
          name: xmlFileName,
          type: 'XML',
          path: `/mock-download/${xmlFileName}` // Dummy path
        },
        cdr: {
          name: cdrFileName,
          type: 'CDR',
          path: `/mock-download/${cdrFileName}` // Dummy path
        }
      }
    };
  }

  return {
    message: 'No se encontraron documentos con los criterios de búsqueda proporcionados.',
    files: null
  };
}

export async function testSmbConnection(formData: FormData) {
  // This is a mock. In a real application, you'd use a library like 'smb2'
  // to connect to the SMB share with the provided credentials.
  const ipAddress = formData.get('ipAddress');

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (ipAddress === '192.168.1.134') {
    return { success: true, message: 'Conexión exitosa a la ruta SMB.' };
  }
  
  return { success: false, message: 'Error al conectar. Verifique los datos.' };
}
