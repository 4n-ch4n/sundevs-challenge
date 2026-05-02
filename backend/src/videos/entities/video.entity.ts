import { ApiProperty } from '@nestjs/swagger';

export class Video {
  @ApiProperty({
    example: 'https://via.placeholder.com/300x200/282c34/61dafb?text=GraphQL',
    description: 'Miniatura del video',
  })
  thumbnail!: string;

  @ApiProperty({
    example: 'GraphQL desde cero',
    description: 'Titulo del video',
  })
  title!: string;

  @ApiProperty({
    example: 'MidudevFan',
    description: 'Canal que publicó el video',
  })
  author!: string;

  @ApiProperty({
    example: 'Hace 2 meses',
    description: 'Fecha relativa en la que se publicó el video',
  })
  relativeDate!: string;

  @ApiProperty({
    example: '0',
    description: 'Nivel de hype del video',
  })
  hypeLevel!: number;
}
