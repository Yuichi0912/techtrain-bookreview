describe("Station01", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login"); // 今回はファイルの相対パス
  });

  it("登録済みのメールアドレス、パスワードを入力した場合(成功)", () => {
    cy.get("input[type=email]").type("abc@sample.com");
    cy.get("input[type=password]").type("japan");
    cy.get("button[type=button]").click();
    
  });

  it("メールアドレスが空欄の場合()", () => {
    cy.get("input[type=password]").type("japan");
    cy.intercept(
      "POST",
      "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/signin"
    ).as("post_user");
    cy.get("button[type=button]").click();
    cy.wait("@post_user").should((xhr) => {
      expect(xhr.response.statusCode).to.eq(400);
    });
    cy.task("log", "400 バリデーションエラー");
  });

  it("メールアドレスに@が入っていない場合", () => {
    cy.get("input[type=email]").type("abcsample.com");
    cy.get("input[type=password]").type("japan");
    cy.intercept(
      "POST",
      "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/signin"
    ).as("post_user");
    cy.get("button[type=button]").click();
    cy.wait("@post_user").should((xhr) => {
      expect(xhr.response.statusCode).to.eq(403);
    });
    cy.task("log", "403 認証エラー");
  });

  it("パスワードが入力されていない場合", () => {
    cy.get("input[type=email]").type("abcsample.com");
    cy.intercept(
      "POST",
      "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/signin"
    ).as("post_user");
    cy.get("button[type=button]").click();
    cy.wait("@post_user").should((xhr) => {
      expect(xhr.response.statusCode).to.eq(400);
    });
    cy.task("log", "400 バリデーションエラー");
  });
});
