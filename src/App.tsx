import TextField from "@mui/material/TextField";
import "./styles/tailwind.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import "./styles/tailwind.css";

type Article = {
  index: number;
  content: string;
  title: string;
  url: string;
};
function App() {
  const [inputValue, setInputValue] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article>();
  const [open, setOpen] = useState(false);
  const INDEXNAME = "articles";
  const HOSTNAME = "localhost:9200";

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  useEffect(() => {
    axios
      .get(`http://${HOSTNAME}/${INDEXNAME}/_search?pretty=true&q=*:*`)
      .then((res) => {
        const articlesMetaData = res.data.hits.hits;
        const articlesQueried = articlesMetaData.map((metaData: any) => {
          return metaData._source;
        });
        setArticles(articlesQueried);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = () => {
    console.log(inputValue);
  };

  const loadModal = (article: Article) => {
    setSelectedArticle(article);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };
  return (
    <div className="flex items-start justify-center w-full h-screen pt-8">
      <div className="w-2/3 max-w-md h-screen ">
        <div className="flex gap-2 mb-3">
          <TextField
            label="Enter your search here"
            className="mb-3"
            variant="standard"
            fullWidth
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button
            size="small"
            onClick={handleClick}
            variant="outlined"
            className="mb-4"
          >
            Search
          </Button>
        </div>

        <div className="h-full overflow-auto mb-3">
          {articles.map((article: Article) => (
            <div key={article.index}>
              <Card className="mb-4">
                <CardContent className="h-36 overflow-hidden">
                  <Typography gutterBottom variant="h5" component="div">
                    {article.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="truncate-multiline"
                  >
                    {article.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => loadModal(article)}>
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </div>
        <Pagination count={10} />
      </div>
      {open && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3 max-h-[90vh] flex flex-col">
            <div className="px-4 py-2 flex justify-between items-center border-b">
              <h2 className="text-xl font-semibold">
                {selectedArticle?.title}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-800 text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <p className="text-gray-700">{selectedArticle?.content}</p>
            </div>
            <div className="px-4 py-2 border-t flex justify-end">
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
