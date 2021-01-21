using System.IO;
using System.Threading.Tasks;

namespace AudioBoos.Server.Helpers {
    public static class FileSystemHelpers {
        public static Task<string[]> GetDirectoriesAsync(string path) {
            var results = Directory.GetDirectories(path);

            return Task.FromResult(results);
        }

        public static string GetBaseName(this string path) {
            return Path.GetFileName(path);
        }

        public static string GetAbsolutePath(this string path) {
            return new FileInfo(path).FullName;
        }

        public static Task<string[]> GetFilesAsync(string path) {
            var results = Directory.GetFiles(path);
            return Task.FromResult(results);
        }
    }
}
