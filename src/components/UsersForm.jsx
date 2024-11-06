import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { http } from "../services/http";
import Input from "./Input";
import Select from "./Select";
import Button from "./button";

const newUserFormScheme = z.object({
  id: z.number().optional(),
  nome: z.string().min(1, "Informe o nome"),
  matricula: z.string().min(1, "Informe a matrícula"),
  idPerfil: z.number().min(1, "Informe o perfil"),
  idCarteira: z.number().min(1, "Informe a carteira"),
  senha: z.string().min(1, "Informe a senha"),
});

export function UsersForm({ onSubmit, defaultValues }) {
  const { register, ...formMethods } = useForm({
    values: defaultValues ?? {
      nome: "",
      matricula: "",
      idPerfil: 0,
      idCarteira: 0,
      senha: "",
    },
    resolver: zodResolver(newUserFormScheme),
  });

  const { data: sections = [] } = useQuery({
    queryKey: ["sections"],
    queryFn: async () => {
      const response = await http.get("/carteira");

      return response.data;
    },
  });

  const { data: profiles } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const response = await http.get("/perfil");

      return response.data.perfis;
    },
  });

  const profilesOptions = profiles?.map((profile) => ({
    label: profile.nome,
    value: profile.id,
  }));

  const sectionsOptions = sections?.map((section) => ({
    label: section.nome,
    value: section.id,
  }));

  return (
    <form
      className="flex items-center mt-8 flex-col gap-4"
      onSubmit={formMethods.handleSubmit((values) => {
        onSubmit(values);
      })}
    >
      <div className="flex gap-12">
        <Input
          label="Nome"
          className="mt-1"
          placeholder="Nome"
          {...register("nome")}
          error={formMethods.formState.errors?.nome?.message}
        />
        <Input
          className="mt-1"
          placeholder="Senha do usuário"
          label="Senha"
          {...register("senha")}
          error={formMethods.formState.errors?.senha?.message}
        />
      </div>

      <div className="flex gap-12">
        <Input
          className="mt-1"
          placeholder="Matrícula"
          label="Matrícula"
          {...register("matricula")}
          error={formMethods.formState.errors?.matricula?.message}
        />
        <Controller
          control={formMethods.control}
          name="idCarteira"
          render={({ field: { onChange, value } }) => (
            <Select
              label="Carteira"
              options={sectionsOptions}
              placeholder="Carteira"
              onChange={(option) => {
                onChange(option.value);
              }}
              value={sectionsOptions?.find((v) => v.value === value)}
              error={formMethods.formState.errors?.idCarteira?.message}
            />
          )}
        />
        <Controller
          control={formMethods.control}
          name="idPerfil"
          render={({ field: { onChange, value } }) => (
            <Select
              label="Perfil"
              options={profilesOptions}
              placeholder="Perfil"
              onChange={(option) => {
                onChange(option.value);
              }}
              value={profilesOptions?.find((v) => v.value === value)}
              error={formMethods.formState.errors?.idPerfil?.message}
            />
          )}
        />
      </div>

      <Button className="mt-4" type="submit">
        Confirmar
      </Button>
    </form>
  );
}
