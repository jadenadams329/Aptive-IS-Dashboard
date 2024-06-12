import os
from random import randint, sample
from datetime import datetime, timedelta

start_date = datetime(2024, 5, 1)
end_date = datetime.now()
delta = end_date - start_date
total_days = delta.days

random_days = sample(range(total_days + 1), k=int(0.65 * (total_days + 1)))

for i in random_days:
    commit_date = start_date + timedelta(days=i)
    formatted_date = commit_date.strftime('%Y-%m-%d %H:%M:%S')

    for j in range(0, randint(1, 12)):
        with open('file.txt', 'a') as file:
            file.write(f'{commit_date} commit\n')
        os.system('git add .')
        os.system(f'git commit --date="{formatted_date}" -m "commit"')

os.system('git push -u origin main')
