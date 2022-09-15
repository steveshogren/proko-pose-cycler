open System.IO

let writeOut () =
    let allFiles = Directory.EnumerateFiles(".\\public\\poses", "*.*", SearchOption.AllDirectories)

    use file = new StreamWriter("src/poses.js", false)
    file.WriteLine("export const poses = [")

    allFiles
    |> Seq.map (fun path -> Path.Join("poses",  path))
    // |> Seq.map (fun path -> "\"" + path.Replace("poses\\.\\public\\", "\\\\") + "\",")
    |> Seq.map (fun path -> "\"" + path.Replace("poses\\.\\public\\", "\\").Replace("\\", "\\\\") + "\",")
    // |> Seq.iter (fun f -> printfn "%A" f)
    |> Seq.iter (fun f -> file.WriteLine(f))

    file.WriteLine("];")

writeOut ()