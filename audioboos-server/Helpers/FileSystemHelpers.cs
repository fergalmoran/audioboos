using System;
using System.IO;
using System.Threading.Tasks;

namespace AudioBoos.Server.Helpers {
    public static class FileSystemHelpers {
        static string[] audioFileExtensions = {
            ".WAV", ".MID", ".MIDI", ".WMA", ".MP3", ".OGG", ".RMA"
        };

        public static Task<string[]> GetDirectoriesAsync(string path) {
            var results = Directory.GetDirectories(path);

            return Task.FromResult(results);
        }

        public static string GetBaseName(this string path) {
            return Path.GetFileName(path);
        }

        public static bool IsAudioFile(this string path) {
            return -1 != Array.IndexOf(
                audioFileExtensions,
                Path.GetExtension(path).ToUpperInvariant()
            );
        }

        public static string GetAlbumArt(this string path, string type = "Large") {
            string[] checks = {
                $"AlbumArt_*_{type}.jpg",
                $"AlbumArt_*_{type}.jpeg",
                $"AlbumArt{type}.jpg",
                $"AlbumArt{type}.jpeg",
                "folder.jpg",
                "folder.jpeg"
            };
            foreach (var check in checks) {
                var files = Directory.GetFiles(path, check, SearchOption.TopDirectoryOnly);
                if (files.Length != 0) {
                    return files[0];
                }
            }

            return string.Empty;
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
