'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { searchDocuments } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Archive, Download, FileText, Loader2, Search, TriangleAlert } from 'lucide-react';
import type { SearchState } from '@/lib/types';
import { useEffect, useRef } from 'react';

const initialState: SearchState = {
  message: null,
  files: null,
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto bg-primary hover:bg-primary/90">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Buscando...
        </>
      ) : (
        <>
          <Search className="mr-2 h-4 w-4" />
          Buscar Documento
        </>
      )}
    </Button>
  );
}

export function SearchForm() {
  const [state, formAction] = useFormState(searchDocuments, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if(!state.errors && state.message) {
      // Reset form on successful search, maybe? Or keep values?
      // For now, let's keep them.
    }
  }, [state]);

  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Filtros de Búsqueda</CardTitle>
          <CardDescription>Complete los campos para encontrar el documento.</CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="ruc">RUC del Emisor</Label>
                <Input id="ruc" name="ruc" placeholder="Ej: 20546008879" maxLength={11} />
                {state.errors?.ruc && <p className="text-sm text-destructive">{state.errors.ruc[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="documentType">Tipo de Documento</Label>
                <Select name="documentType">
                    <SelectTrigger id="documentType">
                        <SelectValue placeholder="Seleccione un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="01">Factura</SelectItem>
                        <SelectItem value="03">Boleta</SelectItem>
                        <SelectItem value="07">Nota de Crédito</SelectItem>
                        <SelectItem value="08">Nota de Débito</SelectItem>
                    </SelectContent>
                </Select>
                {state.errors?.documentType && <p className="text-sm text-destructive">{state.errors.documentType[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="voucherNumber">Serie y Número</Label>
                <Input id="voucherNumber" name="voucherNumber" placeholder="Ej: FM01-0001570" />
                 {state.errors?.voucherNumber && <p className="text-sm text-destructive">{state.errors.voucherNumber[0]}</p>}
              </div>
            </div>
            <div className="flex justify-end">
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>
      
      {state.message && (
        <div>
          {!state.files ? (
             <Alert variant="destructive">
                <TriangleAlert className="h-4 w-4" />
                <AlertTitle>No Encontrado</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">Resultados</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    {state.files.xml && (
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Archivo XML Firmado</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-muted-foreground break-all">{state.files.xml.name}</p>
                            <Button asChild variant="outline" size="sm" className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground">
                                <a href={state.files.xml.path} download>
                                    <Download className="mr-2 h-4 w-4" />
                                    Descargar
                                </a>
                            </Button>
                        </CardContent>
                    </Card>
                    )}
                    {state.files.cdr && (
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Archivo CDR (RPTA)</CardTitle>
                            <Archive className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                             <p className="text-xs text-muted-foreground break-all">{state.files.cdr.name}</p>
                            <Button asChild variant="outline" size="sm" className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground">
                                <a href={state.files.cdr.path} download>
                                    <Download className="mr-2 h-4 w-4" />
                                    Descargar
                                </a>
                            </Button>
                        </CardContent>
                    </Card>
                    )}
                </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
