using System.IO;
using System.Threading.Tasks;

namespace AudioBoos.Server.Helpers {
    public static class FileSystemHelpers {
        public static Task<string[]> GetDirectoriesAsync(string path) {
            var results = Directory.GetDirectories(path);

            return Task.FromResult(results);
        }

        public static string GetFolderName(this string path) {
            return Path.GetFileName(path);
        }
    }
}
