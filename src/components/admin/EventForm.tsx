
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventFormValues, eventFormSchema } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface EventFormProps {
  defaultValues: EventFormValues;
  onSubmit: (values: EventFormValues) => void;
  onCancel: () => void;
}

const EventForm = ({ defaultValues, onSubmit, onCancel }: EventFormProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    defaultValues.date ? new Date(parseDate(defaultValues.date)) : new Date()
  );

  // Fonction pour convertir une date au format FR (DD/MM/YYYY) en Date
  function parseDate(dateStr: string): Date {
    if (!dateStr) return new Date();
    
    // Si la date est déjà au format français (DD/MM/YYYY)
    const frRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const frMatches = dateStr.match(frRegex);
    
    if (frMatches) {
      return new Date(Number(frMatches[3]), Number(frMatches[2]) - 1, Number(frMatches[1]));
    }
    
    // Essayer de parser la date directement
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date;
    }
    
    // Fallback à la date actuelle
    return new Date();
  }

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues,
  });

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDate(date);
    
    // Format la date au format français JJ/MM/AAAA
    const formattedDate = format(date, 'dd/MM/yyyy', { locale: fr });
    form.setValue('date', formattedDate);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "pl-3 text-left font-normal flex justify-between items-center",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value || <span>Sélectionner une date</span>}
                        <CalendarIcon className="h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statut</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="completed">Terminé</SelectItem>
                    <SelectItem value="in-progress">En cours</SelectItem>
                    <SelectItem value="pending">À venir</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location.address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            Enregistrer l'événement
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
