import os
import shutil
import ctypes
import errno

# Function to delete files and directories forcefully
def force_delete(path):
    try:
        total_items = count_items(path)
        deleted_items = 0
        
        # Check if path exists
        if os.path.exists(path):
            # If it's a file, try to delete it
            if os.path.isfile(path):
                try:
                    os.remove(path)
                    deleted_items += 1
                    print_progress(deleted_items, total_items)
                except Exception as e:
                    print(f"Failed to delete {path}: {e}")
                    # Try to change file attributes to normal and then delete
                    try:
                        ctypes.windll.kernel32.SetFileAttributesW(path, 1)  # 1 means FILE_ATTRIBUTE_NORMAL
                        os.remove(path)
                        deleted_items += 1
                        print_progress(deleted_items, total_items)
                    except Exception as e:
                        print(f"Failed to forcibly delete {path}: {e}")
            # If it's a directory, try to delete it recursively
            elif os.path.isdir(path):
                try:
                    shutil.rmtree(path, ignore_errors=True, onerror=handle_remove_readonly)
                    deleted_items += 1
                    print_progress(deleted_items, total_items)
                except Exception as e:
                    print(f"Failed to delete {path}: {e}")
                    # Try to change directory attributes to normal and then delete
                    try:
                        ctypes.windll.kernel32.SetFileAttributesW(path, 1)  # 1 means FILE_ATTRIBUTE_NORMAL
                        shutil.rmtree(path, ignore_errors=True, onerror=handle_remove_readonly)
                        deleted_items += 1
                        print_progress(deleted_items, total_items)
                    except Exception as e:
                        print(f"Failed to forcibly delete {path}: {e}")
        else:
            print(f"Path {path} does not exist.")
    
    except Exception as e:
        print(f"An error occurred: {e}")

# Function to count total files and directories
def count_items(path):
    total_items = 0
    for root, dirs, files in os.walk(path):
        total_items += len(files) + len(dirs)
    return total_items

# Function to handle read-only files and directories
def handle_remove_readonly(func, path, exc_info):
    exc_value = exc_info[1]
    if func in (os.rmdir, os.remove) and exc_value.errno == errno.EACCES:
        try:
            os.chmod(path, 0o777)  # Change file permissions to 0o777 (full access for owner, group, and others)
            func(path)
        except Exception as e:
            print(f"Failed to delete {path}: {e}")
    else:
        raise

# Function to print progress percentage
def print_progress(current, total):
    percentage = (current / total) * 100
    print(f"Progress: {current}/{total} ({percentage:.2f}%)", end='\r')

# Example usage:
path_to_delete = r'H:\Windows'  # Replace with the path you want to delete
force_delete(path_to_delete)
