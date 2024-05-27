import * as Yup from 'yup';

const schema: Yup.ObjectSchema<PaginationDTO> = Yup.object().shape({
  pageSize: Yup.number().required(),
  pageNumber: Yup.number().required(),
  searchText: Yup.string(),
});


export class PaginationDTO {

  public pageSize?: number;

  public pageNumber?: number;

  public searchText?: string;

  static async created(data: { [key: string]: any }): Promise<[any?, PaginationDTO?]>
  {
    try {
      const dto = new PaginationDTO();

      dto.pageNumber = data.pageIndex + 1 || 1;
      dto.pageSize = data.pageSize || 10;
      dto.searchText = data.filter || undefined;

      await schema.validate(dto, { abortEarly: false });

      return [
        undefined,
        dto
      ];
    } catch (error) {
      if (error instanceof Yup.ValidationError)
        return [error.errors];
      throw new Error();
    }
  }

}