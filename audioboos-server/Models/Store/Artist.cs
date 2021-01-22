using System.Collections.Generic;

namespace AudioBoos.Server.Models.Store {
    public class Artist {
        public int Id { get; set; }

        public string ArtistName { get; set; }
        public string Description { get; set; }
        public string SmallImage { get; set; }
        public string LargeImage { get; set; }

        public List<Album> Albums { get; set; }
    }
}
