import { InputType, Field, ID } from '@nestjs/graphql';

/**
 * Input DTO for toggling module completion status.
 */
@InputType()
export class ToggleCompletionInput {
    @Field(() => ID)
    id!: string;

    @Field()
    completed!: boolean;
}
