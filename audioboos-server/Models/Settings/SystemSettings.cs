namespace AudioBoos.Server.Models.Settings {
    public class SystemSettings {
        public SystemSettings() : this(string.Empty, string.Empty) {
        }

        public SystemSettings(string hostname, string audioPath) {
            Hostname = hostname;
            AudioPath = audioPath;
        }

        public string Hostname { get; set; }
        public string AudioPath { get; set; }
    }
}
