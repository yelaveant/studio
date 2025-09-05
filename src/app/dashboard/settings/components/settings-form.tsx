
'use client'

import { useFormStatus } from "react-dom";
import { testSmbConnection } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Power, Save } from "lucide-react";

function TestConnectionButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" variant="outline" disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Probando...
                </>
            ) : (
                <>
                    <Power className="mr-2 h-4 w-4" />
                    Probar Conexión
                </>
            )}
        </Button>
    )
}

export function SettingsForm() {
    const { toast } = useToast();

    async function handleTestAction(formData: FormData) {
        const result = await testSmbConnection(formData);
        if (result.success) {
            toast({
                title: "Éxito",
                description: result.message,
            });
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: result.message,
            });
        }
    }

    return (
        <Card>
            <form action={handleTestAction}>
                <CardHeader>
                    <CardTitle>Parámetros de Conexión</CardTitle>
                    <CardDescription>
                        Ingrese las credenciales y la ruta para la conexión SMB. Estos datos se guardan localmente.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="ipAddress">Dirección IP del Servidor</Label>
                            <Input id="ipAddress" name="ipAddress" placeholder="192.168.1.200" defaultValue="192.168.1.200"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sharedFolder">Ruta de Carpeta Compartida</Label>
                            <Input id="sharedFolder" name="sharedFolder" placeholder="\Sistemas\DATASUN" defaultValue="\Sistemas\DATASUN"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="username">Usuario</Label>
                            <Input id="username" name="username" placeholder="Opcional" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input id="password" name="password" type="password" placeholder="Opcional" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <TestConnectionButton />
                    <Button disabled>
                        <Save className="mr-2 h-4 w-4" />
                        Guardar Cambios
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
