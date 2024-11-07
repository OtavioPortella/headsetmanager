import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "./button";
import Input from "./Input";

const schema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  estoqueSimples: z.number().min(0, "Estoque simples deve ser maior que 0"),
  estoqueDuplo: z.number().min(0, "Estoque duplo deve ser maior que 0"),
  endereco: z.object({
    rua: z.string().min(1, "Rua é obrigatória"),
    numero: z.string().min(1, "Número é obrigatório"),
    bairro: z.string().min(1, "Bairro é obrigatório"),
    cidade: z.string().min(1, "Cidade é obrigatória"),
    estado: z.string().min(1, "Estado é obrigatório"),
    cep: z.string().min(1, "CEP é obrigatório"),
  }),
});

function CompanyForm({ onSubmit, defaultValues }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {
      nome: "",
      estoqueSimples: 0,
      estoqueDuplo: 0,
      endereco: {
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
      },
    },
  });

  const isEditing = !!defaultValues?.id;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-lg mx-auto"
    >
      <Input label="Nome" error={errors.nome?.message} {...register("nome")} />

      <Input
        label="CEP"
        error={errors.endereco?.cep?.message}
        {...register("endereco.cep")}
      />

      <div className="flex gap-4">
        <Input
          type="number"
          label="Estoque Simples"
          error={errors.estoqueSimples?.message}
          {...register("estoqueSimples", { valueAsNumber: true })}
          containerClassName="flex-1"
        />

        <Input
          type="number"
          label="Estoque Duplo"
          error={errors.estoqueDuplo?.message}
          {...register("estoqueDuplo", { valueAsNumber: true })}
          containerClassName="flex-1"
        />
      </div>

      <Input
        label="Rua"
        error={errors.endereco?.rua?.message}
        {...register("endereco.rua")}
      />

      <Input
        label="Número"
        error={errors.endereco?.numero?.message}
        {...register("endereco.numero")}
      />

      <Input
        label="Bairro"
        error={errors.endereco?.bairro?.message}
        {...register("endereco.bairro")}
      />

      <Input
        label="Cidade"
        error={errors.endereco?.cidade?.message}
        {...register("endereco.cidade")}
      />

      <Input
        label="Estado"
        error={errors.endereco?.estado?.message}
        {...register("endereco.estado")}
      />

      <Button type="submit">{isEditing ? "Editar" : "Criar"} Filial</Button>
    </form>
  );
}

export default CompanyForm;
