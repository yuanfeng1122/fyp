from google.cloud import storage
from config import Config

def get_storage_client():
    if Config.CLOUD_STORAGE['type'] == 'google':
        client = storage.Client.from_service_account_json(
            Config.CLOUD_STORAGE['credentials_path']
        )
        return client.bucket(Config.CLOUD_STORAGE['bucket_name'])
    else:
        # AWS S3实现
        pass

def upload_file(file_stream, destination_blob_name):
    bucket = get_storage_client()
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_file(file_stream)
    return blob.public_url 