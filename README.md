!autotrain llm --train --project_name your_project_name --model TinyPixel/Llama-2-7B-bf16-sharded --data_path your_data_set --use_peft --use_int4 --learning_rate 2e-4 --train_batch_size 2 --num_train_epochs 3 --trainer sft --model_max_length 2048 --push_to_hub --repo_id your_repo_id -

!autotrain llm --train --project_name your_project_name --model TinyPixel/Llama-2-7B-bf16-sharded --data_path your_data_set --use_peft --use_int4 --learning_rate 2e-4 --train_batch_size 2 --num_train_epochs 3 --trainer sft --model_max_length 2048 --push_to_hub --repo_id your_repo_id -




!autotrain llm --train --project_name your_project_name --model TinyPixel/Llama-2-7B-bf16-sharded --data_path . --use_peft --use_int4 --learning_rate 2e-4 --train_batch_size 2 --num_train_epochs 3 --trainer sft --model_max_length 2048 