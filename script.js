document
  .querySelector(".generate-btn")
  .addEventListener("click", async function () {
    const prompt = document.querySelector("textarea").value;
    const loading = document.querySelector(".loading");
    const resultImage = document.querySelector(".result-image");

    if (!prompt) {
      alert("请输入图像描述");
      return;
    }

    // 显示加载状态
    loading.style.display = "block";
    resultImage.style.display = "none";

    try {
      const response = await fetch("https://api.coze.cn/v1/workflow/run", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer pat_0paOtgmImnJzQkeNLeexPr5sdMcVKWS5uZqtimIU37u81zHPFMYQjcdauI0DsszB",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workflow_id: "7434081050852605978",
          parameters: {
            BOT_USER_INPUT: prompt,
          },
        }),
      });

      const data = await response.json();

      if (data.code === 0) {
        const outputData = JSON.parse(data.data);
        const imageUrl = outputData.output.images[0].image_url;

        // 显示结果
        resultImage.style.display = "block";
        resultImage.src = imageUrl;
      } else {
        throw new Error(data.msg || "生成失败");
      }
    } catch (error) {
      alert("生成图像时出现错误：" + error.message);
    } finally {
      loading.style.display = "none";
    }
  });
