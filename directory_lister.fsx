open System.IO

let writeOut () =
    let allFiles = Directory.EnumerateFiles(".\\public\\poses", "*.*", SearchOption.AllDirectories)

    use file = new StreamWriter("test.js", false)
    file.WriteLine("export const poses = [")

    allFiles
    |> Seq.map (fun path -> Path.Join("..", "poses",  Path.GetFileName(path)))
    |> Seq.map (fun path -> "\"" + path.Replace("\\", "\\\\") + "\",")
    |> Seq.iter (fun f -> file.WriteLine(f))

    file.WriteLine("];")

writeOut ()