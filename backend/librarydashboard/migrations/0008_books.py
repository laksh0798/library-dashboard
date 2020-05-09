# Generated by Django 2.2.12 on 2020-04-13 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('librarydashboard', '0007_delete_books'),
    ]

    operations = [
        migrations.CreateModel(
            name='Books',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('owner', models.CharField(max_length=100)),
                ('bookIssueTo', models.CharField(max_length=100)),
                ('buyingDate', models.DateTimeField()),
                ('dateOfIssue', models.DateTimeField(blank=True)),
                ('dateOfSubmit', models.DateTimeField(blank=True)),
            ],
        ),
    ]
