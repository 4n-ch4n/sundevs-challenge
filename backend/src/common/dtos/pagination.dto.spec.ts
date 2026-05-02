import { validate } from 'class-validator';
import { PaginationDto } from './pagination.dto';
import { plainToInstance } from 'class-transformer';

describe('pagination.dto.ts', () => {
  it('should validate with default values', async () => {
    const dto = new PaginationDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate with valid data', async () => {
    const dto = new PaginationDto();
    dto.limit = 20;
    dto.offset = 5;

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should fail validation with negative limit', async () => {
    const dto = new PaginationDto();
    dto.limit = -1;

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThanOrEqual(1);
    expect(errors[0].property).toBe('limit');
    expect(errors[0].constraints).toHaveProperty('isPositive');
  });

  it('should fail validation with offset less than 0', async () => {
    const dto = new PaginationDto();
    dto.offset = -1;

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThanOrEqual(1);
    expect(errors[0].property).toBe('offset');
    expect(errors[0].constraints).toHaveProperty('min');
  });

  it('should transform strings to numbers', async () => {
    const input = { limit: '10', offset: '5' };
    const dto = plainToInstance(PaginationDto, input);

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
    expect(dto.limit).toBe(10);
    expect(dto.offset).toBe(5);
  });
});
