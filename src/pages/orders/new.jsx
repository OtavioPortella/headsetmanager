import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/button";
import Title from "../../components/Title";
import Container from "../../components/Container";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../../services/http";
import { useNavigate } from "react-router-dom";

const createOrderSchema = z.object({
  qtdSimples: z.number().min(1, "Quantidade deve ser maior que 0"),
  matriculas: z
    .array(z.string().min(1, "Matrícula é obrigatória"))
    .min(1, "Informe ao menos uma matrícula"),
  motivo: z.enum(["NOVATO", "TROCA"], {
    required_error: "Selecione um motivo",
  }),
});

function CreateOrder() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(createOrderSchema),
  });

  const {
    fields: matriculas,
    append: appendMatricula,
    remove: removeMatricula,
  } = useFieldArray({
    control,
    name: "matriculas",
  });

  const { mutate: createOrder } = useMutation({
    mutationFn: async (data) => {
      await http.post("/pedido", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      navigate("/orders");
    },
  });

  const motivosOptions = [
    { label: "NOVATO", value: "NOVATO" },
    { label: "TROCA", value: "TROCA" },
  ];

  return (
    <Container>
      <Title>Novo Pedido</Title>

      <form
        onSubmit={handleSubmit((values) => {
          createOrder(values);
        })}
        className="flex flex-col gap-4 max-w-lg mx-auto"
      >
        <Input
          label="Quantidade simples"
          error={errors.qtdSimples?.message}
          {...register("qtdSimples", { valueAsNumber: true })}
        />

        <Controller
          control={control}
          name="motivo"
          render={({ field: { onChange, value } }) => (
            <Select
              options={motivosOptions}
              placeholder="Motivo"
              onChange={(option) => {
                onChange(option.value);
              }}
              value={motivosOptions?.find((v) => v.value === value)}
              error={errors.motivo?.message}
            />
          )}
        />

        {matriculas.map((matricula, index) => (
          <Input
            key={matricula.id}
            label={`Matrícula ${index + 1}`}
            {...register(`matriculas.${index}`)}
            error={errors.matriculas?.[index]?.message}
          />
        ))}
        <div className="flex justify-between">
          <Button
            type="button"
            onClick={() => removeMatricula(matriculas.length - 1)}
            disabled={matriculas.length === 0}
          >
            Remover Matrícula
          </Button>
          <Button type="button" onClick={() => appendMatricula("")}>
            Adicionar Matrícula
          </Button>
        </div>

        {errors.matriculas && (
          <span className="text-red-500 font-semibold mt-2">
            {errors.matriculas.message}
          </span>
        )}

        <Button type="submit">Criar Pedido</Button>
      </form>
    </Container>
  );
}

export default CreateOrder;
