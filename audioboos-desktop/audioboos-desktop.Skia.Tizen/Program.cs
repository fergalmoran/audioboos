using Tizen.Applications;
using Uno.UI.Runtime.Skia;

namespace audioboos_desktop.Skia.Tizen
{
	class Program
	{
		static void Main(string[] args)
		{
			var host = new TizenHost(() => new audioboos_desktop.App(), args);
			host.Run();
		}
	}
}
