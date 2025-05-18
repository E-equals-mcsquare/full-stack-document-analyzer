import boto3
import os

boto3.Session(profile_name="default")

def upload_to_s3(file_path, key):
    s3 = boto3.client("s3")
    bucket = os.getenv("S3_BUCKET_NAME")
    if not bucket:
        raise ValueError("S3_BUCKET_NAME is not set in environment variables")
    s3.upload_file(file_path, bucket, key)
