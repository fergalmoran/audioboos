namespace AudioBoos.Server.Models.DTO {
    public record SettingsDTO {
        public string SiteName { get; }

        public SettingsDTO(string? siteName) => (SiteName) = (siteName);
    }
}
