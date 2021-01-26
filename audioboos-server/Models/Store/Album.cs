using System.Collections.Generic;

namespace AudioBoos.Server.Models.Store {
    public class Album {
        public int Id { get; set; }
        public string ArtistName { get; set; }
        public string AlbumName { get; set; }
        public string Description { get; set; }
        public string SmallImage { get; set; }
        public string LargeImage { get; set; }

        public string PhysicalPath { get; set; }

        public List<Track> Tracks { get; set; }
    }
}
